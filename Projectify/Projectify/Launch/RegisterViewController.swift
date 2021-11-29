//
//  RegisterViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import UIKit
import Alamofire



class RegisterViewController: UIViewController {
    
    let APICaller = APIFunctions()

    @IBOutlet weak var nameField: UITextField!
    @IBOutlet weak var emailField: UITextField!
    @IBOutlet weak var passwordField: UITextField!
    @IBOutlet weak var repeatPasswordField: UITextField!
    @IBOutlet weak var statusLabel: UILabel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        hidesKeyboard()
        // Do any additional setup after loading the view.
    }
    
    @IBAction func doCancelButton(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func doRegister(_ sender: Any) {
        
        let name:String = nameField.text!
        let email:String = emailField.text!
        let password:String = passwordField.text!
        let password2:String = repeatPasswordField.text!
        
        if (name == "" || email == "" || password == "") {
            statusLabel.text = "Please Fill All Fields"
        } else if (password != password2) {
            statusLabel.text = "Passwords Must Match"
        } else {
            
            let parameters:Parameters = [
                "name": name,
                "email": email,
                "password": password,
                "message":""
            ]
            
            APICaller.registerUser(params: parameters)

            statusLabel.text = "Yay"
            self.performSegue(withIdentifier: "registerToHome", sender: self)
 
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
