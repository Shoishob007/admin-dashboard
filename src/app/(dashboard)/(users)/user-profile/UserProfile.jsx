// "use client";

// import { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { useSession } from "next-auth/react";

// export default function UserProfile({ params }) {
//   const { id } = params;
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { data: session } = useSession();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/${
//             session?.user?.role === "org" ? "organizations" : "applicants"
//           }/${id}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${session?.access_token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data.");
//         }
//         const data = await response.json();
//         setUserData(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, [id, session?.access_token]);

//   if (isLoading) {
//     return <Skeleton className="h-screen w-full" />;
//   }

//   if (!userData) {
//     return <p className="text-center text-red-500">User not found.</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <Card className="shadow-xl">
//         <CardHeader className="flex gap-3">
//           <Avatar className="h-24 w-24">
//             <AvatarImage src={userData.pictureUrl} />
//             <AvatarFallback>{userData.name[0]}</AvatarFallback>
//           </Avatar>
//           <div className="flex flex-col justify-center">
//             <h2 className="text-xl font-semibold">{userData.name}</h2>
//             <p className="text-sm text-gray-500">{userData.email}</p>
//             <div className="flex space-x-2 mt-2">
//               {userData.skills?.map((skill) => (
//                 <Badge key={skill} variant="outline" className="text-xs">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             <p className="text-gray-700">
//               <span className="font-semibold">Bio: </span>
//               {userData.bio || "No bio available."}
//             </p>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-end">
//           <a href={`mailto:${userData.email}`} className="text-blue-500">
//             Contact
//           </a>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
