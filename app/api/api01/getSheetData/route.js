import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzKBJY3hRENQaa625m3MYUSNSFZ__KEbppYTg5veNmBATZ7ztNX7rBtw1JzhiUL0l0D/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
