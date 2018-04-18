class SetDefaultForAuthorAndText < ActiveRecord::Migration[5.0]
  def up
    change_column_default(:comments, :author, "")
    change_column_default(:comments, :text, "")
  end

  def down
    change_column_default(:comments, :author, nil)
    change_column_default(:comments, :text, nil)
  end
end
