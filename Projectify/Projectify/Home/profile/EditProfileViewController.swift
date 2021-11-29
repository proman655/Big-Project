//
//  EditProfileViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/28/21.
//

import UIKit
import Alamofire
import AlamofireImage

class EditProfileViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    
    let APICaller = APIFunctions()

    @IBOutlet weak var editProfilePicView: UIImageView!
    @IBOutlet weak var editNameTextField: UITextField!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        editProfilePicView.layer.borderWidth = 1
        editProfilePicView.layer.masksToBounds = false
        editProfilePicView.layer.borderColor = UIColor.black.cgColor
        editProfilePicView.layer.cornerRadius = editProfilePicView.frame.height/2
        editProfilePicView.clipsToBounds = true

        hidesKeyboard()
    }
    
    @IBAction func doEditProfile(_ sender: Any) {
        
        let newName = editNameTextField.text
        
        let parameters:Parameters = [
            "name":newName
        ]
        
        APICaller.editProfile(params: parameters)
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func onProfilePicture(_ sender: Any) {
        
        let picker = UIImagePickerController()
        picker.delegate = self
        picker.allowsEditing = true
        
        picker.sourceType = .photoLibrary
        present(picker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        let image = info[.editedImage] as! UIImage
        
        let size = CGSize(width: 200, height: 200)
        let scaledImage = image.af_imageAspectScaled(toFill: size)
        
        editProfilePicView.image = scaledImage
        
        dismiss(animated: true, completion: nil)
    }
    
    @IBAction func doCancelEditProfileVC(_ sender: Any) {
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
