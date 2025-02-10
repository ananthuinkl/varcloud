import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();

        const response = await fetch("https://script.google.com/macros/s/AKfycbykLBg4D5ITAFB4S6AHeKiOlikIAOzMkjKU-nBYQLvlwdLTrpkEJ3gHrv1-V7jdAZO-/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return NextResponse.json({ message: "Data updated successfully!" }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to update sheet" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
