import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbykLBg4D5ITAFB4S6AHeKiOlikIAOzMkjKU-nBYQLvlwdLTrpkEJ3gHrv1-V7jdAZO-/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
