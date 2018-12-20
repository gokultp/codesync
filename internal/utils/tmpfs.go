package utils

import (
	"os"
	"strings"

	"github.com/gokultp/codesync/pkg/fs"
)

const (
	CachePath string = "/tmp/sync/"
)

// CacheFiles will cache files in the given path
func CacheFiles(path string) error {
	info, err := os.Lstat(path)
	if err != nil {
		return err
	}
	return fs.Copy(path, CachePath, info)
}

func GetCacheFilePath(filepath string) string {
	return CachePath + filepath
}

func GetLocalPath(globalPath, filepath string) string {
	return strings.Replace(filepath, globalPath, "", 0)
}
