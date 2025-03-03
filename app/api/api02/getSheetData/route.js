import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzKnW278llpqyGzxTgy2f8DYNL7LFPiAGjYJ7mo6lf3Wdm5bCReByTYo4m3MceThmAX/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
