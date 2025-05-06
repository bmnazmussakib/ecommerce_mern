exports.Hello=(req,res)=>{
    res.status(200).json({
        status: "success",
        data: "Hello, World!"
    })
}