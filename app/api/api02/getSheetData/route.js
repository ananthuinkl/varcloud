import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzSS-JX-tMCjFjx_0XsMkRRVy8I6BSpCYpEw7BQ3p_H_ZEkx9CL_M7qUlrrwTyeqMoE8A/exec");
        const data = await response.json();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}
