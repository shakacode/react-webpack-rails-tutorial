require 'rails_helper'

feature 'Add new comment' do
  scenario 'selects horizontal form', js: true do
    visit root_path
    click_link 'Horizontal Form'
    fill_in 'Your Name', with: 'Tommy'
    fill_in 'Say something...', with: "Surf's up dude!"
    click_button 'Post'
    expect(page).to have_text('Tommy')
    expect(page).to have_text("Surf's up dude!")
    #expect(page).to have_selector('div.commentAuthor foobar', :text => 'Tommy')
    #expect(find('#commentList').find('h2')).to have_content('Tommy')
    #expect(find('#commentList').find('span')).to have_content("Surf's up dude!")
  end

  scenario 'selects stacked form', js: true do
    visit root_path
    click_link 'Stacked Form'
    fill_in 'Your Name', with: 'Spicoli'
    fill_in 'Say something...', with: 'Cowabunga dude!'
    click_button 'Post'
    expect(page).to have_text('Spicoli')
    expect(page).to have_text('Cowabunga dude!')
  end

  scenario 'selects inline form', js: true do
    visit root_path
    click_link 'Inline Form'
    fill_in 'Your Name', with: 'Wilbur Kookmeyer'
    fill_in 'Say something...', with: 'dude!'
    click_button 'Post'
    expect(page).to have_text('Wilbur Kookmeyer')
    expect(page).to have_text('dude!')
  end



end


