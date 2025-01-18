import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.JWT_SECRET || "secret123";

export async function GET() {
  try {
    // Retrieve the cookies object (now async)
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token");

    if (!authToken) {
      return new Response(
        JSON.stringify({ error: "No token found" }),
        { status: 401 }
      );
    }

    const token = authToken.value;

    // Verify and decode the token
    const decoded = jwt.verify(token, SECRET) as { role: string };

    if (!decoded.role) {
      return new Response(
        JSON.stringify({ error: "Invalid token: no role present" }),
        { status: 403 }
      );
    }

    // Return the role in the response
    return new Response(
      JSON.stringify({ role: decoded.role }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);

    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 403 }
    );
  }
}
