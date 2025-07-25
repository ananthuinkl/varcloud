import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwvYpJF7eFY3fwlENp81RIpSzny59etrnz36TQTsD7LdlZC18KwtvIsfn9rgaG-vPtaTg/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
