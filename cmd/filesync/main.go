package main

import (
	"encoding/json"
	"flag"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gokultp/codesync/internal/message"
	"github.com/gokultp/codesync/internal/utils"

	"github.com/gokultp/codesync/pkg/fs"
	"github.com/gorilla/websocket"
	"github.com/radovskyb/watcher"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

var upgrader = websocket.Upgrader{} // use default options
var wt = watcher.New()
var path = ""

func main() {
	go func() {
		for {

		}
	}()

	// Start the watching process - it'll check for changes every 100ms.

	flag.Parse()
	log.SetFlags(0)
	http.HandleFunc("/echo", func(w http.ResponseWriter, r *http.Request) {
		upgrader.CheckOrigin = func(r *http.Request) bool { return true }
		c, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Print("upgrade:", err)
			return
		}
		defer c.Close()
		go func() {
			for {
				var msg message.Message
				_, message, err := c.ReadMessage()
				if err != nil {
					log.Println("read:", err)
					return
				}
				err = json.Unmarshal(message, &msg)
				if err != nil {
					log.Println("read:", err)
					return
				}
				if msg.Type == "add" {
					path = msg.Path
					if err := wt.AddRecursive(msg.Path); err != nil {
						log.Fatalln(err)
					}
					if err := wt.Start(time.Millisecond * 100); err != nil {
						log.Fatalln(err)
					}
					continue
				}
				if msg.Type == "diff" {
					cachPath := utils.GetCacheFilePath(msg.Path)
					err = ioutil.WriteFile("/tmp/patch", []byte(msg.Diff), 0604)
					if err != nil {
						panic(err)
					}
					err = fs.Patch(path+msg.Path, "/tmp/patch")
					if err != nil {
						panic(err)
					}
					err = fs.Patch(cachPath, "/tmp/patch")
					if err != nil {
						panic(err)
					}
				}
			}
		}()
		for {
			select {
			case event := <-wt.Event:
				if !event.IsDir() {
					localPath := utils.GetLocalPath(path, event.Path)
					cachPath := utils.GetCacheFilePath(localPath)
					diff, err := fs.Diff(localPath, cachPath)
					if err != nil {
						panic(err)
					}
					err = ioutil.WriteFile("/tmp/patch", diff, 0604)
					if err != nil {
						panic(err)
					}
					err = fs.Patch(cachPath, "/tmp/patch")
					if err != nil {
						panic(err)
					}
					err = c.WriteMessage(1, diff)
					if err != nil {
						panic(err)
					}
				}

			case err := <-wt.Error:
				log.Fatalln(err)
			case <-wt.Closed:
				return
			}

		}
	})

	log.Fatal(http.ListenAndServe(*addr, nil))
}
