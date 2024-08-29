import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useOrderForm } from "@/hooks/useOrderForm";
import StockInfoCard from "@/components/StockInfoCard";
import OrderTypeButtons from "@/components/OrderTypeButtons";
import OrderForm from "@/components/OrderForm";
import ResultDisplay from "@/components/ResultDisplay";

const CreateOrderModal = () => {
  const {
    showResult,
    amount,
    stockQuantity,
    lastOrder,
    name,
    last_price,
    close_price,
    returnPercentage,
    error,
    formik,
    errors,
    touched,
    price,
    isOrderTypeBuy,
    isOrderTypeSell,
    buttonTitle,
    isLoading,
    hasQuantityValue,
    isOrderMarket,
    isOrderLimit,
    handleSelectOrderType,
    handleAmountChange,
    handleQuantityChange,
    handlePriceChange,
    handleChangeOrderType,
    handleShowForm
  } = useOrderForm();

  return (
    <View style={styles.modalContainer}>
      {!showResult && (
        <>
          <StockInfoCard
            name={name}
            last_price={last_price}
            close_price={close_price}
            returnPercentage={returnPercentage}
          />

          <OrderTypeButtons
            onSelectOrderType={handleSelectOrderType}
            isOrderTypeBuy={isOrderTypeBuy}
            isOrderTypeSell={isOrderTypeSell}
          />

          <View style={styles.content}>
            <OrderForm
              amount={amount}
              stockQuantity={stockQuantity}
              onAmountChange={handleAmountChange}
              onQuantityChange={handleQuantityChange}
              isOrderTypeBuy={isOrderTypeBuy}
              isOrderMarket={isOrderMarket}
              isOrderLimit={isOrderLimit}
              price={price}
              errors={errors}
              touched={touched}
              handleChangeInputPrice={handlePriceChange}
              handleChangeOrderType={handleChangeOrderType}
            />

            <TouchableOpacity
              onPress={() => formik.handleSubmit()}
              disabled={isLoading}
              style={[
                styles.submmitButton,
                hasQuantityValue && styles.submitButtonActive,
              ]}
            >
              <Text style={styles.submmitButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {showResult && (
        <ResultDisplay lastOrder={lastOrder} error={error ?? ""} handleShowForm={handleShowForm} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  submmitButton: {
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 40,
    backgroundColor: Colors.lightGray,
  },
  submmitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  submitButtonActive: {
    backgroundColor: "#0052A5",
  },
});

export default CreateOrderModal;
