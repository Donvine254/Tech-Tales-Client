import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

type userData = {
  username: string;
  password: string;
  email: string;
  bio?: string;
  picture?: string;
  role: string;
};

const createUserAvatar = (username: string) => {
    
};
