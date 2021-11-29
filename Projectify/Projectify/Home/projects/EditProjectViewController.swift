//
//  EditProjectViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/28/21.
//

import UIKit
import Alamofire

class EditProjectViewController: UIViewController {

    @IBOutlet weak var newTitleTextField: UITextField!
    @IBOutlet weak var newCategoryTextField: UITextField!
    @IBOutlet weak var newDescriptionTextView: UITextView!
    @IBOutlet weak var newDueDatePicker: UIDatePicker!
    @IBOutlet weak var editProjectStatusLabel: UILabel!
    
    let APICaller = APIFunctions()
    var projectTotEditId:String = ""
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print(APICaller.getSelectedProjectId())
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
        
        if (newTitle == "" || newCategory == "" || newDescription == "") {
            editProjectStatusLabel.text = "Please Fill All Fields"
        } else {
            APICaller.editProject(newTitle: newTitle!, newCategory: newCategory!, newDescription: newDescription!, newDueDate: dateFormater.string(from: newDueDate))
            editProjectStatusLabel.text = "Project Updated!"
            dismiss(animated: true, completion: nil)
        }
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
