import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
    try {
        const { email, name, password } = await req.json();

        const existingUser = await prismadb.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'Email already exists' }, { status: 422 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }
}
