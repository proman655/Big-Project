//
//  EditProjectViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/28/21.
//

import UIKit

class EditProjectViewController: UIViewController {

    @IBOutlet weak var newTitleTextField: UITextField!
    @IBOutlet weak var newCategoryTextField: UITextField!
    @IBOutlet weak var newDescriptionTextView: UITextView!
    @IBOutlet weak var newDueDatePicker: UIDatePicker!
    
    let APICaller = APIFunctions()
    var projectTotEditId:String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print(projectTotEditId)
        newDescriptionTextView.layer.borderColor = UIColor(red: 0.9, green: 0.9, blue: 0.9, alpha: 1.0).cgColor
        newDescriptionTextView.layer.borderWidth = 1.0
        newDescriptionTextView.layer.cornerRadius = 5

        hidesKeyboard()
    }
    
    @IBAction func doEditProject(_ sender: Any) {
        
        let newTitle = newTitleTextField.text
        let newCategory = newCategoryTextField.text
        let newDescription = newDescriptionTextView.text
        let newDueDate = newDueDatePicker.date
        
        let dateFormater = DateFormatter()
        dateFormater.dateFormat = "MM/dd/YYYY"
        
    }
    
    @IBAction func doCancelEdit(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    func hidesKeyboard() {
        let tap:UITapGestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(dismissKeyboard))
        tap.cancelsTouchesInView = false
        view.addGestureRecognizer(tap)
    }
    
    @objc func dismissKeyboard() {
        view.endEditing(true)
    }

}
