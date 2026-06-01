import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import DashboardHomeScreen from "./drawer/DashboardHomeScreen";
import BranchManagementScreen from "./drawer/BranchManagementScreen";
import BranchHeadApprovalsScreen from "./drawer/BranchHeadApprovalsScreen";
import CommunicationBoardsScreen from "./drawer/CommunicationBoardsScreen";

const Drawer = createDrawerNavigator();

export default function SuperAdminDashboard() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardHomeScreen}
      />

      <Drawer.Screen
        name="Branch Management"
        component={BranchManagementScreen}
      />

      <Drawer.Screen
        name="Branch Head Approvals"
        component={BranchHeadApprovalsScreen}
      />

      <Drawer.Screen
        name="Communication Boards"
        component={CommunicationBoardsScreen}
      />
    </Drawer.Navigator>
  );
}