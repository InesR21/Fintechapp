import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LastOrderType } from "@/interfaces";
import Feather from "@expo/vector-icons/Feather";
import { formatCurrency } from "@/utils/financialUtils";
import {
  ORDER_METHODS,
  ORDER_TEXTS,
  ORDER_TYPE,
  STATUS_TEXTS,
} from "@/constants/textConstants";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

type ResultDisplayProps = {
  lastOrder: LastOrderType;
  error: string;
  handleShowForm: () => void;
};

const ResultDisplay = ({
  lastOrder,
  error,
  handleShowForm,
}: ResultDisplayProps) => {
  const { id, side, type, quantity, price, status } = lastOrder;
  const orderValue = price && quantity ? price * quantity : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case STATUS_TEXTS.FILLED:
        return styles.statusFilled;
      case STATUS_TEXTS.PENDING:
        return styles.statusPending;
      case STATUS_TEXTS.REJECTED:
        return styles.statusRejected;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case STATUS_TEXTS.FILLED:
        return <Feather name={"check-circle"} size={24} color={"green"} />;
      case STATUS_TEXTS.PENDING:
        return <Feather name={"clock"} size={24} color={"orange"} />;
      case STATUS_TEXTS.REJECTED:
        return <Feather name={"alert-circle"} size={24} color={"red"} />;
      default:
        return null;
    }
  };

  const getOrderDescription = () => {
    const action = side === ORDER_TYPE.BUY ? "Compra" : "Venta";
    const orderType = type === ORDER_METHODS.MARKET ? "a mercado" : "límite";
    return `${action} ${orderType} de ${quantity} acciones`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {status && getStatusIcon(status)}
          <Text style={styles.orderTitle}>Orden {id}</Text>
        </View>
        <View
          style={[styles.statusBadge, status ? getStatusColor(status) : null]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.orderDescription}>{getOrderDescription()}</Text>
          <Text style={styles.orderValue}>{formatCurrency(orderValue)}</Text>
          <Text style={styles.orderPrice}>
            Precio por acción: {formatCurrency(price ?? 0)}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {status === STATUS_TEXTS.PENDING && (
          <Text style={styles.footerText}>
            Su orden límite ha sido enviada al mercado y está pendiente de
            ejecución.
          </Text>
        )}
        {status === STATUS_TEXTS.FILLED && type === ORDER_METHODS.MARKET && (
          <Text style={styles.footerText}>
            Su orden de mercado ha sido ejecutada inmediatamente.
          </Text>
        )}
        {status === STATUS_TEXTS.REJECTED && (
          <Text style={styles.footerText}>
            Su orden ha sido rechazada. Por favor, verifique su saldo y los
            requisitos del mercado.
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleShowForm}>
          <Text style={styles.buttonText}>Volver al Formulario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor:Colors.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
  statusFilled: {
    backgroundColor: Colors.success,
  },
  statusPending: {
    backgroundColor: "#fbbf24", // Yellow
  },
  statusRejected: {
    backgroundColor: Colors.danger,
  },
  statusDefault: {
    backgroundColor: Colors.gray,
  },
  body: {
    padding: 16,
  },
  bodyContent: {
    marginBottom: 8,
  },
  orderDescription: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 4,
  },
  orderValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderPrice: {
    fontSize: 14,
    color: Colors.gray,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.lightGray,
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray,
  },
  errorBox: {
    width: "100%",
    padding: 8,
    marginTop: 8,
    backgroundColor: Colors.danger_100,
    borderWidth: 1,
    borderColor: Colors.danger_400,
    borderRadius: 4,
  },
  errorText: {
    fontSize: 14,
    color: Colors.danger_700,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.white,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  }
});

export default ResultDisplay;
