import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState<{ status: string; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/status")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Belajar Vibe Coding!</Text>
      
      <View style={styles.card}>
        <Text style={styles.subtitle}>Backend Status:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : data ? (
          <View>
            <Text>Status: {data.status}</Text>
            <Text>Message: {data.message}</Text>
          </View>
        ) : (
          <Text style={styles.error}>Failed to fetch from backend.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  error: {
    color: "red",
  }
});
