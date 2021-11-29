//
//  LoginViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import UIKit
import Alamofire



class LoginViewController: UIViewController {
    
    let APICaller = APIFunctions()

    @IBOutlet weak var emailField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    @IBOutlet weak var statusLabel: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        hidesKeyboard()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func doLogin(_ sender: Any) {
        
        let email:String = emailField.text!
        let password:String = passwordField.text!
        
        if (email == "" || password == "") {
            statusLabel.text = "Please Enter Both Fields"
        } else {
            
            let parameters:Parameters = [
                "email": email,
                "password": password
            ]
            let loginStatus = APICaller.loginUser(params: parameters)
            if(loginStatus == 1) {
                statusLabel.text = APICaller.getLoginStatus()
            } else if (loginStatus == 0){
                statusLabel.text = "Yay"
                self.performSegue(withIdentifier: "loginToHome", sender: self)
            } else {
                statusLabel.text = "Error loging in"
            }
        }
    }
    
    func hidesKeyboard() {
        let tap:UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }
    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }
    
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
