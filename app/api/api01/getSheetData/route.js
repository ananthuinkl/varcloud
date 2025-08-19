import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzO7-RrF0cmrO3NxiIgObJIUgaN8-Y21DPH8sfSoVkOxf4CMuJgSH4WQX74XRCf9wnrZw/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
