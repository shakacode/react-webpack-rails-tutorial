class ChangeAuthorAndTextToNotNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:comments, :author, false, "")
    change_column_null(:comments, :text, false, "")
  end
end
