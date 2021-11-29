//
//  CreateProjectViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/25/21.
//

import UIKit

class CreateProjectViewController: UIViewController {
    
    let APICaller = APIFunctions()
    
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var categoryTextField: UITextField!
    @IBOutlet weak var descriptionTextView: UITextView!
    @IBOutlet weak var dueDatePicker: UIDatePicker!
    @IBOutlet weak var creteProjectStatus: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        descriptionTextView.layer.borderColor = UIColor(red: 0.9, green: 0.9, blue: 0.9, alpha: 1.0).cgColor
        descriptionTextView.layer.borderWidth = 1.0
        descriptionTextView.layer.cornerRadius = 5
        
        hidesKeyboard()
        print(APICaller.getUserID())
    }
    
    @IBAction func doCreateProject(_ sender: Any) {
        
        let title = titleTextField.text
        let category = categoryTextField.text
        let description = descriptionTextView.text
        let dueDate = dueDatePicker.date
        
        let dateFormater = DateFormatter()
        dateFormater.dateFormat = "MM/dd/YYYY"
        
        if(title == "" || description == "" || category == "")
        {
            creteProjectStatus.text = "Please Fill All Fields"
        } else {
            let APICaller = APIFunctions()
            APICaller.newProject(title: title!, category: category!, description: description!, dueDate: dateFormater.string(from: dueDate))
            creteProjectStatus.text = "Project Created!"
            let projectCount = APICaller.getNumberOfProjects() + 1
            APICaller.setNumberOfProjects(count: projectCount)
            dismiss(animated: true, completion: nil)
        }
        
    }
    @IBAction func doCancelVC(_ sender: Any) {
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
