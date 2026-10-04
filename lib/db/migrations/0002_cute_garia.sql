-- Custom SQL migration file, put your code below! --
UPDATE enrollment SET
  first_payment        = COALESCE(volley_account, gymnastics_first_installment),
  first_payment_date   = COALESCE(volley_account_date, gymnastics_first_installment_date),
  first_payment_type   = COALESCE(volley_account_type, gymnastics_first_installment_type),
  second_payment       = COALESCE(volley_balance, gymnastics_second_installment),
  second_payment_date  = COALESCE(volley_balance_date, gymnastics_second_installment_date),
  second_payment_type  = COALESCE(volley_balance_type, gymnastics_second_installment_type),
  third_payment        = COALESCE(volley_second_balance, gymnastics_third_installment),
  third_payment_date   = COALESCE(volley_second_balance_date, gymnastics_third_installment_date),
  third_payment_type   = COALESCE(volley_second_balance_type, gymnastics_third_installment_type)
WHERE num_nonnulls(
  first_payment, first_payment_date, first_payment_type,
  second_payment, second_payment_date, second_payment_type,
  third_payment, third_payment_date, third_payment_type
) = 0;
