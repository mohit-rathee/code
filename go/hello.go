package main

import (
	"fmt"
	"time"
	// "sync"
)
// var wg = sync.WaitGroup()

const sir = "Mohit"

func main(){
	// wg.Add(5)
	hello()
	hello()
	hello()
	hello()
	hello()
	// wg.Wait()
}

func hello(){
	time.Sleep(1 * time.Second)
	fmt.Println("hello ",sir)
	// wg.Done()
}