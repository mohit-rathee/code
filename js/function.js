function test() {
    console.log('test is running.')
    let isOpen = false;
    const closure =  () => {
        if (isOpen) console.log('open')
        else console.log('closed')
        console.log(this.isOpen)
        isOpen = !isOpen
    }
    closure.isOpen = false
    return closure
}
closured_func = test()
console.log(closured_func)
closured_func()
console.log(closured_func)
closured_func.isOpen = true
console.log(closured_func)
closured_func()
console.log(closured_func)
