import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();

        const response = await fetch("https://script.google.com/macros/s/AKfycbzKBJY3hRENQaa625m3MYUSNSFZ__KEbppYTg5veNmBATZ7ztNX7rBtw1JzhiUL0l0D/exec", {
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
