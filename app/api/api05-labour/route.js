// This code works for both Pages Router (pages/api/...)
// and App Router (app/api/.../route.js) with minor adjustments.

// The URL you copied after deploying your Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzucUd4PYAX8hRPqh02L0gxbzxfnAkN0mmFP_lJiMI2dfpT7UloS2VmXLXVYvHMqbHDuQ/exec";

// For App Router (app/api/ratio-data/route.js)
export async function GET(request) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: "GET",
      redirect: "follow", // Important for Apps Script
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Failed to update data: ${response.statusText}`);
    }

    const result = await response.json();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}