import * as React from "react";
import Navigator from "./scripts/navigation/Navigation";
import { Dimensions, SafeAreaView, StatusBar } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { executeSqlCreateTables } from "./scripts/sql/executer";
import Fallback from "./scripts/screens/Fallback";
import AuthProvider from "./scripts/context/AuthProvider";
export default function App() {
  return (
    <React.Fragment>
      <StatusBar />
      <React.Suspense fallback={<Fallback />}>
        <SQLiteProvider
          databaseName="test.db"
          onInit={executeSqlCreateTables}
          useSuspense
        >
          <AuthProvider>
            <SafeAreaView
              style={{ flex: 1, height: Dimensions.get("window").height }}
            >
              <Navigator />
            </SafeAreaView>
          </AuthProvider>
        </SQLiteProvider>
      </React.Suspense>
    </React.Fragment>
  );
}
