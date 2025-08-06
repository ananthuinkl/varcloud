import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbycbAK_gHtJmJiHzKLrJatvhYgW6tJoq9iGEPUc9ZdhGrVqf4gU1Vk78Qng92VSC9gBzQ/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
