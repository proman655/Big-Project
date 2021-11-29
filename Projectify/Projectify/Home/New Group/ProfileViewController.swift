//
//  ProfileViewController.swift
//  Projectify
//
//  Created by Gustavo Cornejo on 11/24/21.
//

import UIKit
import AlamofireImage

class ProfileViewController: UIViewController {

    let APICaller = APIFunctions()
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var profilePicView: UIImageView!
    
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        nameLabel.text = APICaller.getUserName()
        emailLabel.text = APICaller.getUserEmail()
        
        let urlString = APICaller.getUserPic()
        let url = URL(string: urlString)!
        
        profilePicView.af.setImage(withURL: url)
        
        profilePicView.layer.borderWidth = 1
        profilePicView.layer.masksToBounds = false
        profilePicView.layer.borderColor = UIColor.black.cgColor
        profilePicView.layer.cornerRadius = profilePicView.frame.height/2
        profilePicView.clipsToBounds = true
    }

}
