#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri:: {
    menu:: {
        Menu, MenuEvent , MenuItem, Submenu, MenuBuilder, SubmenuBuilder,
        AboutMetadataBuilder
    }
};

#[tauri::command]
fn create_menu_app () {
    
}

fn main() {

}