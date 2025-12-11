import { NextResponse } from "next/server";

// APP Router for log in - this will call dal/auth - login mthod
export async function POST(req: Request) {
    // return res;
    try{
        const body = await req.json();

        if(!body.email || !body.password){
            return NextResponse.json({error: 'email/passowrd requiored'}, {status: 400})
        }

        const backendRes = await fetch("http://localhost:3005/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
        });
    
        const data = await backendRes.json();
    
        if (!backendRes.ok) {
            return NextResponse.json(
                { error: "Backend server unavailable. Please try again later." },
                { status: 503 }
            );
        }
    
        const token = data.token;
    
        const res = NextResponse.json({ success: true });
    
        res.cookies.set("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        });
    
        return res;
    }
    catch (err) {
        return NextResponse.json(
            { error: "Backend server unavailable. Please try again later." },
            { status: 503 }
        );
    }
  }

  export async function GET() {
    return new Response("This route only supports POST requests", { status: 200 });
  }