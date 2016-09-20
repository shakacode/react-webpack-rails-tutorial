module Auth
  # @yield [obj, args, ctx] Field resolution parameters
  # @yield return [Object] The return value for this field
  # @return [Proc] the passed-in block, modified to check for `can_read?(item_name)`
  def self.field_for_admin(&block)
    -> (obj, args, ctx) do
      if ctx[:current_user] and ctx[:current_user].admin?
        # continue to the next call:
        block.call(obj, args, ctx)
      else
        raise "Permission denied"
      end
    end
  end

  def self.mutation_for_admin(&block)
    -> (inputs, ctx) do
      if ctx[:current_user] and ctx[:current_user].admin?
        # continue to the next call:
        block.call(inputs, ctx)
      else
        raise "Permission denied"
      end
    end
  end

end