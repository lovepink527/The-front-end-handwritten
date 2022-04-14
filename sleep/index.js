// function sleep(time) {
//     return new Promise(resolve => {
//         console.log(resolve)
//         setTimeout(resolve, time)
//     })
// }

// sleep(10000).then(res => {
//     console.log(`sleep exe ending!`)
// })

function sleep(time) {
    return new Promise(resolve => {
        console.log('执行')
        setTimeout(resolve,time)
    })
}

sleep(4000).then(()=>{
    console.log('end')
})