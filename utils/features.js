import Jwt  from "jsonwebtoken"

export const setcookie = (user,res,message,statuscode)=>{
    const token=Jwt.sign({_id:user._id},process.env.JWT_SECRET);

    // console.log( token);
    
    res.cookie("token",token,{
       httpOnly : true,
      maxAge:30*60*1000 ,
      sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
      secure:process.env.NODE_ENV==="Development" ?false:true 
    }
      ) ;
  
    res.status(statuscode).json({
      success:true,
      message
  })
}
