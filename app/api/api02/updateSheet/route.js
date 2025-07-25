import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const data = await request.json();

        const response = await fetch("https://script.google.com/macros/s/AKfycbzSS-JX-tMCjFjx_0XsMkRRVy8I6BSpCYpEw7BQ3p_H_ZEkx9CL_M7qUlrrwTyeqMoE8A/exec", {
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
