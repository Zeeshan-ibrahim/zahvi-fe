// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//     try {
//         const body = await req.json();

//         console.log("Signup request body:", body);

//         if (!body.fullname || !body.email || !body.password || !body.confirmpassword) {
//             return NextResponse.json({ error: 'fullname/email/password/confirmpassword required' }, { status: 400 });
//         }

//         if (body.password !== body.confirmpassword) {
//             return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
//         }

//         const backendRes = await fetch("http://localhost:3005/auth/signup", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body)
//         });

//         const data = await backendRes.json();

//         if (!backendRes.ok) {
//             const errorMessage = data.error || "Backend server unavailable. Please try again later.";
//             return NextResponse.json({ error: errorMessage }, { status: 503 });
//         }

//         if (data.success) {
//             return NextResponse.json({ message: "Signup successful" }, { status: 200 });
//         } else {
//             const errorMessage = data.error || "Signup failed. Please try again.";
//             return NextResponse.json({ message: errorMessage }, { status: 400 });
//         }
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json(
//             { error: "An unexpected error occurred. Please try again later." },
//             { status: 500 }
//         );
//     }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Signup request body:", body);

        if (!body.fullname || typeof body.fullname !== 'string' || body.fullname.trim() === '') {
            return NextResponse.json({ error: 'Fullname is required and cannot be empty.' }, { status: 400 });
        }
        if (!body.email || typeof body.email !== 'string' || body.email.trim() === '') {
            return NextResponse.json({ error: 'Email is required and cannot be empty.' }, { status: 400 });
        }
        if (!body.password || typeof body.password !== 'string' || body.password.trim() === '') {
            return NextResponse.json({ error: 'Password is required and cannot be empty.' }, { status: 400 });
        }
        if (!body.confirmpassword || typeof body.confirmpassword !== 'string' || body.confirmpassword.trim() === '') {
            return NextResponse.json({ error: 'Confirm password is required and cannot be empty.' }, { status: 400 });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
        }

        if (body.password !== body.confirmpassword) {
            return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
        }

        if (body.password.length < 6) {
            return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
        }

        const backendRes = await fetch("http://localhost:3005/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!backendRes.ok) {
            const errorMessage = `Network error: ${backendRes.statusText}`;
            return NextResponse.json({ error: errorMessage }, { status: 503 });
        }

        const data = await backendRes.json();

        if (data && !data.success) {
            const errorMessage = data.error || "Signup failed. Please try again.";
            return NextResponse.json({ error: errorMessage }, { status: 400 });
        }

        if (data && data.success) {
            return NextResponse.json({ message: "Signup successful" }, { status: 200 });
        }

        return NextResponse.json(
            { error: "Unexpected response from backend. Please try again later." },
            { status: 500 }
        );
    } catch (err) {
        console.error("Error during signup:", err);
        return NextResponse.json(
            { error: "An unexpected error occurred. Please try again later." },
            { status: 500 }
        );
    }
}


