import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return <Tabs screenOptions={
        {
            headerTitle: "Upload",

            headerStyle:{
                backgroundColor: "#000",
                
            },
            headerTitleStyle:{
                fontSize: 25,
                fontWeight: "bold",
            },
            headerTintColor: "#fff",
            tabBarActiveTintColor: "tomato",
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
            },
            tabBarStyle: {
                backgroundColor: "#000",
            },
        }
    }>

        <Tabs.Screen
            name="upload"
            options={
                {
                    tabBarLabel: "Upload",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="upload" size={24} color={color} />
                    ),

                }}
        />
        <Tabs.Screen
            name="info/index"
            options={
                {
                    tabBarLabel: "settings",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="cog" size={24} color={color} />
                    ),
                }}
        />


    </Tabs>;
}
