class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.text :description
      t.date :fromDate
      t.date :toDate
      t.datetime :datetime
      t.string :state

      t.timestamps
    end
  end
end
