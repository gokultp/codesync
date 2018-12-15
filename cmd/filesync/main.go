package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"

	"github.com/gokultp/codesync/pkg/fs"
	"github.com/radovskyb/watcher"
)

func main() {
	path := os.Args[1]
	w := watcher.New()
	go func() {
		for {
			select {
			case event := <-w.Event:
				fmt.Println(event) // Print the event's info.
				diff, err := fs.Diff("./test/a", "./test/b")
				fmt.Println(err)
				ioutil.WriteFile("/tmp/a", diff, 0604)
				err = fs.Patch("./test/b", "/tmp/a")
				fmt.Println(err)
			case err := <-w.Error:
				log.Fatalln(err)
			case <-w.Closed:
				return
			}
		}
	}()

	if err := w.Add(path); err != nil {
		log.Fatalln(err)
	}
	// Print a list of all of the files and folders currently
	// being watched and their paths.
	for path, f := range w.WatchedFiles() {
		fmt.Printf("%s: %s\n", path, f.Name())
	}

	go func() {
		w.Wait()
		w.TriggerEvent(watcher.Create, nil)
		w.TriggerEvent(watcher.Remove, nil)
	}()

	// Start the watching process - it'll check for changes every 100ms.
	if err := w.Start(time.Millisecond * 100); err != nil {
		log.Fatalln(err)
	}

}
