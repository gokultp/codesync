package message

type Message struct {
	Type string `json:"type"`
	Diff string `json:"diff"`
	Path string `json:"path"`
}
