import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Signup request body:", body);
        
        if (!body.fullname || !body.email || !body.password || !body.confirmpassword) {
            return NextResponse.json({ error: 'fullname/email/password/confirmpassword required' }, { status: 400 });
        }

        if (body.password !== body.confirmpassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        const backendRes = await fetch("http://localhost:3005/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await backendRes.json();

        if (!backendRes.ok) {
            const errorMessage = data.error || "Backend server unavailable. Please try again later.";
            return NextResponse.json({ error: errorMessage }, { status: 503 });
        }

        const token = data.token;

        const res = NextResponse.json({ success: true });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        return res;

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}
