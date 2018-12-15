package fs

import (
	"os/exec"
)

var PatchIndex int = 0

func Diff(file, tmpfile string) ([]byte, error) {
	cmd := []string{tmpfile, file}
	return exec.Command("diff", cmd...).Output()
}

func Patch(file, patch string) error {
	cmd := []string{file, "-i", patch}
	_, err := exec.Command("patch", cmd...).Output()
	return err
}
