import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileUser, UserRoundCog, UserRoundPlus, Users2 } from "lucide-react";

const DashCards = () => {
  const getStyle = (value) => ({
    color: value > 0 ? "#50C878" : "red",
  });
  return (
    <>
      <Card className="w-full">
        <div className="flex justify-between items-center">
          <div>
            <CardHeader>
              <CardTitle className="text-gray-600">Total Users</CardTitle>
              <CardDescription className="text-gray-600 text-2xl">
                3,088
              </CardDescription>
            </CardHeader>
          </div>
          <Users2 className="mr-4 text-gray-600" />
        </div>
        <CardContent style={getStyle(2.5)}>+2.5%</CardContent>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <CardHeader>
              <CardTitle className="text-gray-600">Total Applicants</CardTitle>
              <CardDescription className="text-gray-600 text-2xl">
                2,998
              </CardDescription>
            </CardHeader>
          </div>
          <FileUser className="mr-4 text-gray-600" />
        </div>
        <CardContent style={getStyle(0.5)}>+1.5%</CardContent>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <CardHeader>
              <CardTitle className="text-gray-600">
                Total Organizations
              </CardTitle>
              <CardDescription className="text-gray-600 text-2xl">
                90
              </CardDescription>
            </CardHeader>
          </div>
          <UserRoundCog className="mr-4 text-gray-600" />
        </div>
        <CardContent style={getStyle(-1.2)}>-1.2%</CardContent>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <CardHeader>
              <CardTitle className="text-gray-600">New Members</CardTitle>
              <CardDescription className="text-gray-600 text-2xl">
                354
              </CardDescription>
            </CardHeader>
          </div>
          <UserRoundPlus className="mr-4 text-gray-600" />
        </div>
        <CardContent style={getStyle(1.64)}>+1.64%</CardContent>
      </Card>
    </>
  );
};

export default DashCards;
