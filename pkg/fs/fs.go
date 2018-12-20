package fs

import (
	"io"
	"io/ioutil"
	"os"
	"path/filepath"
)

// Copy dispatches copy-funcs according to the mode.
// Because this "copy" could be called recursively,
// "info" MUST be given here, NOT nil.
func Copy(src, dest string, info os.FileInfo) error {
	if info.Mode()&os.ModeSymlink != 0 {
		return lcopy(src, dest, info)
	}
	if info.IsDir() {
		return dcopy(src, dest, info)
	}
	return fcopy(src, dest, info)
}

// fcopy is for just a file,
// with considering existence of parent directory
// and file permission.
func fcopy(src, dest string, info os.FileInfo) error {

	if err := os.MkdirAll(filepath.Dir(dest), os.ModePerm); err != nil {
		return err
	}

	f, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer f.Close()

	if err = os.Chmod(f.Name(), info.Mode()); err != nil {
		return err
	}

	s, err := os.Open(src)
	if err != nil {
		return err
	}
	defer s.Close()

	_, err = io.Copy(f, s)
	return err
}

// dcopy is for a directory,
// with scanning contents inside the directory
// and pass everything to "copy" recursively.
func dcopy(srcdir, destdir string, info os.FileInfo) error {

	if err := os.MkdirAll(destdir, info.Mode()); err != nil {
		return err
	}

	contents, err := ioutil.ReadDir(srcdir)
	if err != nil {
		return err
	}

	for _, content := range contents {
		cs, cd := filepath.Join(srcdir, content.Name()), filepath.Join(destdir, content.Name())
		if err := Copy(cs, cd, content); err != nil {
			// If any error, exit immediately
			return err
		}
	}
	return nil
}

// lcopy is for a symlink,
// with just creating a new symlink by replicating src symlink.
func lcopy(src, dest string, info os.FileInfo) error {
	src, err := os.Readlink(src)
	if err != nil {
		return err
	}
	return os.Symlink(src, dest)
}

// IsDir checks if it is a directory
func IsDir(path string) (bool, error) {
	fileInfo, err := os.Stat(path)
	if err != nil {
		return false, err
	}
	return fileInfo.IsDir(), err
}
