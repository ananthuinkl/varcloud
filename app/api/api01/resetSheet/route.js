// File path: app/api/api01/resetSheet/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        // This takes the body from the frontend, which is { action: 'reset' }
        const data = await request.json();

        // It calls the SAME Apps Script URL as your update function.
        // The Apps Script itself will know what to do based on the 'action'.
        const response = await fetch("https://script.google.com/macros/s/AKfycbzO7-RrF0cmrO3NxiIgObJIUgaN8-Y21DPH8sfSoVkOxf4CMuJgSH4WQX74XRCf9wnrZw/exec", { // <-- IMPORTANT: Use your existing Apps Script URL here
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            return NextResponse.json({ message: result.message }, { status: 200 });
        } else {
            const errorResult = await response.json();
            return NextResponse.json({ message: errorResult.message || "Failed to reset sheet" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
}