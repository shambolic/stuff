json.array!(@reports) do |report|
  json.extract! report, :id, :description, :fromDate, :toDate, :datetime, :state
  json.url report_url(report, format: :json)
end
