"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  encryptPassword,
  Algorithm,
  EncryptionResult,
} from "@/utils/algos";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Component() {
  const [password, setPassword] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("SHA-256");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [hashingDetails, setHashingDetails] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { encryptedPassword, hashingDetails } = await encryptPassword(
      password,
      algorithm,
    );
    setEncryptedPassword(encryptedPassword);
    setHashingDetails(hashingDetails);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-900">
      <div className="w-full max-w-md overflow-y-auto rounded-lg bg-white/20 shadow-lg backdrop-blur-lg">
        <div className="space-y-1 p-6">
          <h1 className="text-2xl font-bold text-white">Password Encryption</h1>
          <p className="text-gray-300">
            Securely encrypt your password using industry-standard algorithms.
          </p>
        </div>
        <form className="space-y-4 pr-6 pl-6 pb-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md bg-white/20 px-3 py-2 text-white backdrop-blur-lg placeholder:text-gray-100"
            />
          </div>
          <div>
            <Label htmlFor="algorithm" className="text-white">
              Encryption Algorithm
            </Label>
            <Select
              value={algorithm}
              onValueChange={(value) => setAlgorithm(value as Algorithm)}
            >
              <SelectTrigger className="mt-1 w-full rounded-md bg-white/20 px-3 py-2 text-white backdrop-blur-lg">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent className="rounded-md bg-white/20 text-white backdrop-blur-lg">
                <SelectItem value="SHA-256">SHA-256</SelectItem>
                <SelectItem value="Bcrypt">Bcrypt</SelectItem>
                <SelectItem value="Argon2">Argon2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Encrypt Password
          </Button>
        </form>
        <div className="flex h-[200px] flex-col justify-evenly rounded-md bg-white/20 p-4 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">Encrypted Password:</span>
            <Drawer>
              <DrawerTrigger className="font-mono text-sm text-gray-200 cursor-pointer">
                <Button variant={"link"} className="p-0 text-gray-200 font-mono h-5">Click to View</Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white/20 backdrop-blur-lg border-none">
                <DrawerHeader className="p-4">
                  <DrawerTitle className="text-white">Encrypted Password</DrawerTitle>
                  <DrawerClose className="text-white hover:text-gray-300" />
                </DrawerHeader>
                <DrawerDescription className="flex items-center justify-center p-4 text-center text-white">
                  <span className="font-mono text-sm">
                    {encryptedPassword}
                  </span>
                </DrawerDescription>
                <DrawerFooter className="p-4">
                  <Button
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                    onClick={() => {
                      navigator.clipboard.writeText(encryptedPassword);
                    }}
                  >
                    Copy
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-white">Hashing Algorithm:</span>
            <span className="font-mono text-sm text-gray-200">{algorithm}</span>
          </div>
          <div className="flex grid grid-cols-2 items-center justify-between">
            <span className="font-medium text-white">Encryption Details:</span>
            <span className="justify-self-end break-all font-mono text-sm text-gray-200">
              {hashingDetails}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
