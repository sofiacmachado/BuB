json.checkout do
  json.id @checkout.id
  json.session_id @checkout.checkout_session_id
  json.currency @checkout.currency
  json.amount @checkout.amount
  json.expires_at @checkout.expires_at
  json.books @checkout.book_ids
end
